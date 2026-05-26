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

    // Match both full-width ￥ and half-width ¥ variants.
    const match = line.match(/[￥¥]{2}/);

    if (match) {
      // Find the position of the yuan symbol pair
      const startPos = match.index;
      const endPos = startPos + 2;

      // Replace the matched yuan symbol pair with $$
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
