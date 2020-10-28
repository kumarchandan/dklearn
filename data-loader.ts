import { Matrix } from 'https://deno.land/x/math@v1.1.0/matrix/matrix.ts';
import { readCSVObjects } from "https://deno.land/x/csv/mod.ts";

export class AdvertisingDataLoader {

    public async loadTrain(newspaper?: boolean, radio?: boolean, TV?: boolean): Promise<any[]> {
        // Loading Radio, and Sales column for now
        const f = await Deno.open('./data/advertising.csv');
        const res = [];
        let X_train = [];
        let y_train = [];

        const options = {
            columnSeparator: ",",
            lineSeparator: "\r\n",
        }
        for await (const obj of readCSVObjects(f, options)) {
            y_train.push(+obj.sales);
            X_train.push(+obj.radio)
        }
        f.close();
        res.push(new Matrix([X_train]), new Matrix([y_train]));
        return res;
    }
}
