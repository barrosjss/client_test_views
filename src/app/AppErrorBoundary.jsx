import { Component } from 'react';
import { EmptyState } from '../shared/ui/EmptyState.jsx';

export class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('[CMOCS] Error en la aplicación:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg)', padding: 24 }}>
          <div className="card" style={{ maxWidth: 420, width: '100%' }}>
            <EmptyState
              variant="error"
              title="Algo salió mal"
              description="Recarga la página o vuelve al inicio para continuar."
              actionLabel="Recargar"
              onAction={() => window.location.reload()}
            />
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
