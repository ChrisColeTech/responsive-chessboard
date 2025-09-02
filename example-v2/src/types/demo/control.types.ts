// Demo control panel types
export interface ControlPanelSettings {
  readonly pieceSet: string;
  readonly boardTheme: string;
  readonly showCoordinates: boolean;
  readonly animationsEnabled: boolean;
  readonly animationDuration: number;
  readonly boardWidth: number;
  readonly boardOrientation: 'white' | 'black';
}

export interface ControlPanelHook {
  readonly settings: ControlPanelSettings;
  readonly updateSetting: (key: string, value: any) => void;
}

export interface ControlPanelSettings_Props {
  readonly settings?: ControlPanelSettings;
  readonly onSettingsChange?: (settings: Partial<ControlPanelSettings>) => void;
  readonly className?: string;
}

export interface ContainerSizeConfig {
  readonly name: string;
  readonly width: number;
  readonly height: number;
}

export interface ResponsiveTestSettings {
  readonly containerSizes: ContainerSizeConfig[];
  readonly currentSize: ContainerSizeConfig;
  readonly showPerformanceMetrics: boolean;
}