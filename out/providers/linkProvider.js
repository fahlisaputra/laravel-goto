'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const util = require("../util");
const fs = require("fs");
class LinkProvider {
    provideDocumentLinks(doc) {
        let documentLinks = [];
        let config = vscode_1.workspace.getConfiguration('laravel_advanced_goto');
        if (config.quickJump) {
            let reg = new RegExp(config.regex, 'g');
            let linesCount = doc.lineCount <= config.maxLinesCount ? doc.lineCount : config.maxLinesCount;
            let index = 0;

            while (index < linesCount) {
                let line = doc.lineAt(index);
     
                if (line.text.trim().startsWith('<link ')) {
                    let href = line.text.indexOf('href=')
                    if (href > 0) {
                        href += 6;
                        let start = new vscode_1.Position(index, href);
                        let end = start.translate(0, line.text.length);
                        let range = new vscode_1.Range(start, end);
                        let link = doc.getText(range);
                        let links = link.split('"');
                        if (links.length > 1) {
                        } else {
                            links = link.split("'");
                        }
                        let script = links[0];
                        let script2 = links[0];
                        if (script.startsWith('/')) {
                            script = script.substring(1);
                        }
                        let public_script = '/public/' + script;
                        let workspaceFolder = vscode_1.workspace.getWorkspaceFolder(doc.uri)?.uri.fsPath || '';
                        let fileUri = workspaceFolder + public_script;


                        let fileext = fileUri.split('.');
                        let isFile = false;
                        if (fileext.length > 1) {
                            let ext = fileext[fileext.length - 1];
                            if (ext.length <= 3) {
                                isFile = true;
                            }
                        }
                        if (fs.existsSync(fileUri) && isFile) {
                            let start2 = new vscode_1.Position(index, line.text.indexOf(script2));
                            let end2 = start.translate(0, script2.length);
                            documentLinks.push(new vscode_1.DocumentLink(new vscode_1.Range(start2, end2), vscode_1.Uri.file(fileUri)));
                        }
                    }
                }

                let source = line.text.indexOf('src=')
                if (source > 0) {
                    source += 5;
                    let start = new vscode_1.Position(index, source);
                    let end = start.translate(0, line.text.length);
                    let range = new vscode_1.Range(start, end);
                    let link = doc.getText(range);
                    let links = link.split('"');
                    if (links.length > 1) {
                    } else {
                        links = link.split("'");
                    }
                    let script = links[0];
                    let script2 = links[0];
                    if (script.startsWith('/')) {
                        script = script.substring(1);
                    }
                    let public_script = '/public/' + script;
                    let workspaceFolder = vscode_1.workspace.getWorkspaceFolder(doc.uri)?.uri.fsPath || '';
                    let fileUri = workspaceFolder + public_script;

                    let fileext = fileUri.split('.');
                    let isFile = false;
                    if (fileext.length > 1) {
                        let ext = fileext[fileext.length - 1];
                        if (ext.length <= 3) {
                            isFile = true;
                        }
                    }
                    if (fs.existsSync(fileUri) && isFile) {
                        let start2 = new vscode_1.Position(index, line.text.indexOf(script2));
                        let end2 = start.translate(0, script2.length);
                        documentLinks.push(new vscode_1.DocumentLink(new vscode_1.Range(start2, end2), vscode_1.Uri.file(fileUri)));
                    }
                  
                }
                let source2 = line.text.indexOf('url(')
                if (source2 > 0) {
                    source2 += 5;
                    let start = new vscode_1.Position(index, source2);
                    let end = start.translate(0, line.text.length);
                    let range = new vscode_1.Range(start, end);
                    let link = doc.getText(range);
                    let links = link.split('"');
                    if (links.length > 1) {
                    } else {
                        links = link.split("'");
                    }
                    let script = links[0];
                    let script2 = links[0];
                    if (script.startsWith('/')) {
                        script = script.substring(1);
                    }
                    let public_script = script;
                    if (public_script.includes('"')) {
                        let links2 = public_script.split('"');
                        if (public_script.length > 1) {
                        } else {
                            links2 = public_script.split("'");
                        }
                        public_script = links2[0];
                    }
                    if (public_script.includes("'")) {
                        let links2 = public_script.split("'");
                        if (public_script.length > 1) {
                        } else {
                            links2 = public_script.split('"');
                        }
                        public_script = links2[0];
                    }
                    let original = public_script;
                    public_script = '/public/' + public_script;
                    let workspaceFolder = vscode_1.workspace.getWorkspaceFolder(doc.uri)?.uri.fsPath || '';
                    let fileUri = workspaceFolder + public_script;


                    let fileext = fileUri.split('.');
                    let isFile = false;
                    if (fileext.length > 1) {
                        let ext = fileext[fileext.length - 1];
                        if (ext.length <= 3) {
                            isFile = true;
                        }
                    }
                    if (fs.existsSync(fileUri) && isFile) {
                        let start2 = new vscode_1.Position(index, line.text.indexOf(original));
                        let end2 = start2.translate(0, original.length);
                        documentLinks.push(new vscode_1.DocumentLink(new vscode_1.Range(start2, end2), vscode_1.Uri.file(fileUri)));
                    }
                }

                let result = line.text.match(reg);
                if (result != null) {
                    for (let item of result) {
                        let file = util.getFilePath(item, doc);
                        if (file != null) {
                            let start = new vscode_1.Position(line.lineNumber, line.text.indexOf(item));
                            let end = start.translate(0, item.length);
                            let documentlink = new vscode_1.DocumentLink(new vscode_1.Range(start, end), file.fileUri);
                            documentLinks.push(documentlink);
                        }
                        ;
                    }
                }
                index++;
            }
        }
        return documentLinks;
    }
}
exports.default = LinkProvider;
//# sourceMappingURL=linkProvider.js.map