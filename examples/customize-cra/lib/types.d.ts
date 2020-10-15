export interface Vars {
    [key: string]: string;
}
export interface Options {
    antDir: string;
    antdStylesDir?: string;
    stylesDir: string | string[];
    varFile: string;
    outputFilePath?: string | never;
    themeVariables?: string[];
    customColorRegexArray?: RegExp[];
}
export interface WebpackPluginOptions extends Options {
    publicPath?: string;
    lessUrl?: string;
    indexFileName?: string;
    generateOnce?: boolean;
}
