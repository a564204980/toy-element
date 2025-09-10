/**
 * 插件钩子函数
 * @param {Object} options - 插件选项
 * @param {Array} options.rmFiles - 构建前需要删除的文件列表
 * @param {Function} options.beforeBuild - 构建前执行的函数
 * @param {Function} options.afterBuild - 构建后执行的函数
 */
export default function hooksPlugin({ rmFiles, beforeBuild, afterBuild, }: {
    rmFiles?: string[];
    beforeBuild?: Function;
    afterBuild?: Function;
}): {
    name: string;
    buildStart(): void;
    buildEnd(err?: Error): void;
};
