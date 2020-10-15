import { Compiler } from 'webpack';
import { WebpackPluginOptions } from './types';
declare class AntDesignThemePlugin {
    options: WebpackPluginOptions;
    generated: boolean;
    colors: string;
    constructor(options: WebpackPluginOptions);
    apply(compiler: Compiler): void;
}
export default AntDesignThemePlugin;
