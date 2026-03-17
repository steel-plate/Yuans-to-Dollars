const obsidian = require('obsidian');

class YuanToDollarPlugin extends obsidian.Plugin {
  async onload() {
    console.log('Yuan to Dollar plugin loaded');

    // Register the editor change handler
    this.registerEvent(
      this.app.workspace.on('editor-change', (editor) => {
        this.handleEditorChange(editor);
      })
    );
  }

  onunload() {
    console.log('Yuan to Dollar plugin unloaded');
  }

  handleEditorChange(editor) {
    const doc = editor.getDoc();
    const cursor = editor.getCursor();

    // Get the current line
    const line = doc.getLine(cursor.line);

    if (!line) return;

    // Check if the line contains ￥￥
    const match = line.match(/￥￥/);

    if (match) {
      // Find the position of ￥￥
      const startPos = match.index;
      const endPos = startPos + 2; // ￥￥ is 2 characters

      // Replace ￥￥ with $$
      doc.replaceRange(
        '$$',
        { line: cursor.line, ch: startPos },
        { line: cursor.line, ch: endPos }
      );

      // Move cursor to the middle (between the two $)
      editor.setCursor({ line: cursor.line, ch: startPos + 1 });
    }
  }
}

module.exports = YuanToDollarPlugin;
