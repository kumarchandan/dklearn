import { Matrix } from 'https://deno.land/x/math/mod.ts';
import ProgressBar from 'https://deno.land/x/progress@v1.1.4/mod.ts';
import { shuffle } from './utility.ts';

export class LinearRegression {

    constructor() {

    }

    public train(X_train: Matrix, y_train: Matrix, epochs: number, w: number, b: number, lr: number, verbose = false) {
        const progress = new ProgressBar({
            total: epochs,
            display: 'Epoch - :completed/:total :time :bar :percent'
        });
        let WB: number[] = [];

        for (let epoch = 0; epoch < epochs; epoch++) {
            // Shuffle X_train, y_train after every epoch
            const XY = shuffle(X_train, y_train);
            [w, b] = this.updateWB(X_train, y_train, w, b, lr)

            if (verbose && epoch % 50 === 0) {
                console.log(`Epoch ${epoch}, Loss: ${this.meanSquaredError(X_train, y_train, w, b)}, w: ${w}, b: ${b}`);
            }
            progress.render(epoch + 1);
        }
        WB.push(w, b);
        return WB;
    }

    updateWB(X_train: Matrix, y_train: Matrix, w: number, b: number, lr: number): number[] {
        let dlDW = 0;
        let dlDB = 0;
        const [rows, cols] = X_train.shape;

        for (let index = 0; index < cols; index++) {
            dlDW = dlDW + (-2 * X_train.matrix[0][index] * (y_train.matrix[0][index] - (w * X_train.matrix[0][index] + b)))
            dlDB = dlDB + (-2 * (y_train.matrix[0][index] - (w * X_train.matrix[0][index] + b)))
        }

        // Update W and B (control the update with learning rate)
        w = w - ( 1 / cols) * dlDW * lr;
        b = b - ( 1 / cols) * dlDB * lr;

        return [w, b];
    }

    meanSquaredError(X_train: Matrix, y_train: Matrix, w: number, b: number) {
        const [rows, cols] = X_train.shape;
        let totalError: number = 0;

        for (let index = 0; index < cols; index++) {
            totalError = totalError + (y_train.matrix[0][index] - (w * X_train.matrix[0][index] + b)) ** 2
        }
        const res = totalError / cols;
        return res;
    }

    predict(X_new: number, w: number, b: number) {
        return X_new * w + b;
    }
}
