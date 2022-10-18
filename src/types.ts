import { MarkdownNode, MarkdownNodePosition } from '@lint-md/parser';
import type { createFixer } from './utils/fixer';
import { createRuleManager } from './utils/rule-manager';

export interface Fix {
  range: TextRange;
  text: string;
}

export interface ReportOption {
  message: string;
  loc: {
    start: MarkdownNodePosition;
    end: MarkdownNodePosition;
  };
  fix?: (fixer: ReturnType<typeof createFixer>) => Fix;
}

export type LintMdRuleContext = ReturnType<ReturnType<typeof createRuleManager>['createRuleContext']>

export interface LintMdRule {
  /**
   * 选择器初始化回调
   */
  create: (context: LintMdRuleContext) => Record<string, (node: MarkdownNode) => void>;

  /**
   * rule 的一些基本信息，后续有需要再补充
   */
  meta?: Record<any, any>;
}

export interface LintMdRuleConfig {
  rule: LintMdRule,
  options?: Record<string, any>
  fileName?: string
}

// 节点队列
export interface NodeQueue {
  node: MarkdownNode;
  isEntering: boolean;
}

// 遍历器的相关选项
export interface TraverserOptions {
  // 在节点进入时做些什么
  onEnter?: (node: MarkdownNode, parent: MarkdownNode) => void;

  // 在节点退出时做些什么
  onLeave?: (node: MarkdownNode, parent: MarkdownNode) => void;
}

export type TextRange = number[];
