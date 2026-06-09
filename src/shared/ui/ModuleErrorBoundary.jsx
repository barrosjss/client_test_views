import { Component } from 'react';
import { EmptyState } from './EmptyState.jsx';

export class ModuleErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error(`[CMOCS] Error en módulo "${this.props.moduleLabel}":`, error, info);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <EmptyState
          variant="error"
          title={`No pudimos cargar ${this.props.moduleLabel}`}
          description="Puedes seguir navegando con el menú. Este módulo se mostrará cuando esté disponible."
          actionLabel="Reintentar"
          onAction={() => this.setState({ error: null })}
        />
      );
    }
    return this.props.children;
  }
}
