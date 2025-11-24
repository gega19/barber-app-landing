import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bartop-p.up.railway.app/api';

interface AnalyticsEvent {
  eventType: string;
  eventName: string;
  platform: 'app' | 'landing' | 'backend';
  userId?: string | null;
  sessionId?: string | null;
  properties?: Record<string, any>;
  metadata?: Record<string, any>;
}

class AnalyticsService {
  private sessionId: string;
  private eventQueue: AnalyticsEvent[] = [];
  private batchSize = 20;
  private batchTimeout = 5 * 60 * 1000; // 5 minutos
  private batchTimer: NodeJS.Timeout | null = null;

  constructor() {
    // Obtener o crear sessionId
    if (typeof window !== 'undefined') {
      this.sessionId = this.getOrCreateSessionId();
    } else {
      this.sessionId = '';
    }
  }

  private getOrCreateSessionId(): string {
    if (typeof window === 'undefined') return '';
    
    const stored = sessionStorage.getItem('analytics_session_id');
    if (stored) return stored;
    
    const newId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', newId);
    return newId;
  }

  private getMetadata(): Record<string, any> {
    if (typeof window === 'undefined') return {};
    
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      referrer: document.referrer,
      url: window.location.href,
      path: window.location.pathname,
      timestamp: new Date().toISOString(),
    };
  }

  async trackEvent(
    eventName: string,
    eventType: string = 'user_action',
    properties?: Record<string, any>
  ): Promise<void> {
    if (typeof window === 'undefined') return;

    const event: AnalyticsEvent = {
      eventType,
      eventName,
      platform: 'landing',
      sessionId: this.sessionId,
      properties: properties || {},
      metadata: this.getMetadata(),
    };

    this.eventQueue.push(event);

    // Si llegamos al límite, enviar inmediatamente
    if (this.eventQueue.length >= this.batchSize) {
      await this.flushEvents();
    } else {
      // Si no hay timer, crear uno
      if (!this.batchTimer) {
        this.batchTimer = setTimeout(() => {
          this.flushEvents();
        }, this.batchTimeout);
      }
    }
  }

  async trackPageView(pageName: string, properties?: Record<string, any>): Promise<void> {
    await this.trackEvent('page_view', 'user_action', {
      pageName,
      ...properties,
    });
  }

  async trackClick(elementName: string, properties?: Record<string, any>): Promise<void> {
    await this.trackEvent('link_clicked', 'user_action', {
      elementName,
      ...properties,
    });
  }

  async trackDownload(versionId?: string, properties?: Record<string, any>): Promise<void> {
    await this.trackEvent('download_started', 'conversion', {
      versionId,
      ...properties,
    });
  }

  async trackScrollDepth(depth: number): Promise<void> {
    await this.trackEvent('scroll_depth', 'engagement', {
      depth,
      depthPercent: Math.round((depth / document.documentElement.scrollHeight) * 100),
    });
  }

  private async flushEvents(): Promise<void> {
    if (this.eventQueue.length === 0) return;

    const eventsToSend = [...this.eventQueue];
    this.eventQueue = [];
    
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }

    try {
      // Asegurar que la URL tenga /api al inicio
      const apiUrl = API_BASE_URL.endsWith('/api') 
        ? `${API_BASE_URL}/analytics/track-batch`
        : `${API_BASE_URL}/api/analytics/track-batch`;
      
      await axios.post(
        apiUrl,
        { events: eventsToSend },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      console.error('Failed to send analytics events:', error);
      // Re-agregar eventos a la cola para reintentar
      this.eventQueue.unshift(...eventsToSend);
    }
  }

  // Enviar eventos pendientes antes de cerrar la página
  setupBeforeUnload(): void {
    if (typeof window === 'undefined') return;
    
    window.addEventListener('beforeunload', () => {
      // Usar sendBeacon para enviar eventos de forma síncrona
      if (this.eventQueue.length > 0) {
        // Asegurar que la URL tenga /api al inicio
        const apiUrl = API_BASE_URL.endsWith('/api') 
          ? `${API_BASE_URL}/analytics/track-batch`
          : `${API_BASE_URL}/api/analytics/track-batch`;
        
        navigator.sendBeacon(
          apiUrl,
          JSON.stringify({ events: this.eventQueue })
        );
      }
    });
  }
}

// Singleton instance
export const analytics = new AnalyticsService();

// Setup beforeunload listener
if (typeof window !== 'undefined') {
  analytics.setupBeforeUnload();
}

