import { all, create, EvalFunction, MathExpression } from "mathjs";

import { Calculator } from "../../core/networks/CalculatorInterface";

const mathjs = create(all);
mathjs.config({
    number: "number",
});

class MathJSCalculator implements Calculator {
    private compiledExpressions: { [key: string]: EvalFunction } = {};

    evaluate(expression: MathExpression, scope: unknown): number {
        const compiledExpressionIndex = expression.toString();
        if (!this.compiledExpressions[compiledExpressionIndex]) {
            this.compiledExpressions[compiledExpressionIndex] =
                mathjs.compile(expression);
        }

        return this.compiledExpressions[compiledExpressionIndex].evaluate(
            scope
        );
    }
}

export { MathJSCalculator };
