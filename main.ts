import { ExtensionHostKind, createModelReference, monaco, registerExtension, vscode } from "./monaco";

const result = registerExtension(new URL("./extensions/hello-world/package.json", import.meta.url), ExtensionHostKind.LocalProcess);
await result.getApi();

console.log(result);

const modelReference = await createModelReference(monaco.Uri.file("/tmp/test.js"), `// import anotherfile
let variable = 1
function inc () {
	variable++
}

while (variable < 5000) {
	inc()
	console.log('Hello world', variable);
}`);

const mainDocument = await vscode.workspace.openTextDocument(modelReference.object.textEditorModel.uri);

await vscode.window.showTextDocument(mainDocument, {
	"preview": false
});

await createModelReference(monaco.Uri.from({ "scheme": "user", "path": "/settings.json" }), JSON.stringify({
	"workbench.colorTheme": "Default Light+"
}, undefined, "\t"));

globalThis.monaco = monaco;
globalThis.vscode = vscode;

setTimeout(function() {
	console.info("`monaco` and `vscode` have been made available as a browser globals.");
}, 1000);
