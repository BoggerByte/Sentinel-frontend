export interface IGuildConfig {
    permissions: {
        edit: number;
        read: number;
    },
    data: {
        use_config: boolean;
    },
    preset: 'default' | 'custom'
}