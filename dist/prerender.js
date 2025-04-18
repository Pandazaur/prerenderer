var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { chromium } from 'playwright';
import * as fs from 'fs';
export function prerender(url, filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield chromium.launch();
        const page = yield browser.newPage();
        yield page.goto(url, { waitUntil: 'networkidle' });
        const content = yield page.content();
        fs.writeFileSync(filepath, content);
        yield browser.close();
    });
}
//# sourceMappingURL=prerender.js.map