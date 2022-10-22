import { lintMarkdown, lintAndFixInternal } from '../../src';
import noEmptyCode from '../../src/rules/no-empty-code';
import { lintAndFix } from '../../src/core/lint-and-fix';
import { getExample } from '../utils/test-utils';

describe('test core methods for lint-markdown', () => {
  test('test lintMarkdown() to lint source', () => {
    const lintResult = lintMarkdown(`# Hello

Some **importance**, and \`code\`.

\`\`\`javascript

\`\`\``, [
      {
        rule: noEmptyCode
      }
    ]);

    expect(lintResult.ruleManager.getReportData().length).toStrictEqual(1);
    const res = lintResult.ruleManager.getReportData().pop();
    expect(res?.message).toStrictEqual('[lint-md] 代码块内容不能为空，请删除空的代码块，或者填充代码内容');
  });

  test('test lintAndFixInternal() to lint or fix markdown source', () => {
    const res = lintAndFixInternal(`# Hello

Some **importance**, and \`code\`.

\`\`\`javascript

\`\`\``, [
      {
        rule: noEmptyCode
      }
    ], true);

    expect(res.fixedResult?.notAppliedFixes).toStrictEqual([]);
    expect(res.fixedResult?.result).toMatchSnapshot();
  });

  test('test lintAndFix() to lint or fix markdown source', () => {
    const example = getExample('docs-for-all-rules');
    const res = lintAndFix(example);

    expect(res.fixedResult?.result).toMatchSnapshot();
  });
});
