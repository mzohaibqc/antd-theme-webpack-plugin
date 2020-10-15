/// <reference types="less" />
import { Vars, Options } from './types';
export declare function getLessVars(filePath: string, colorsOnly?: boolean): Vars;
export declare function isValidColor(color: string, customColorRegexArray?: RegExp[]): boolean;
export declare function getShade(varName: string): string;
export declare function randomColor(): string;
export declare function getColor(varName: string, mappings: Vars): string;
export declare function generateColorMap(content: string, customColorRegexArray?: RegExp[]): Vars;
export declare function getMatches(string: string, regex: RegExp): Vars;
export declare function render(text: string, paths: string[]): Promise<Less.RenderOutput>;
export declare function compileAllLessFilesToCss(stylesDir: string | string[], antdStylesDir: string, varMap: Vars | undefined, varPath: string): Promise<string>;
export declare function generateTheme({ antDir, stylesDir, varFile, outputFilePath, themeVariables, customColorRegexArray, }: Options): Promise<string>;
