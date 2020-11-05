import { Style } from '../../core/Style';
import { ToolboxPanel } from '../ToolboxPanel';

export type FontChangeHandler = (newFont: string) => void;

export class FontFamilyPanel extends ToolboxPanel {
  private fonts: string[] = [];
  private currentFont?: string;

  private fontBoxes: HTMLDivElement[] = [];

  public onFontChanged?: FontChangeHandler;

  constructor(title: string, fonts: string[], currentFont?: string) {
    super(title);
    this.fonts = fonts;
    this.currentFont = currentFont;

    this.setCurrentFont = this.setCurrentFont.bind(this);
  }

  public getUi(): HTMLDivElement {
    const panelDiv = document.createElement('div');
    // panelDiv.style.display = 'flex';
    panelDiv.style.overflow = 'hidden';
    panelDiv.style.flexGrow = '2';
    this.fonts.forEach((font) => {
      const fontBoxContainer = document.createElement('div');
      fontBoxContainer.style.display = 'inline-block';
      // fontBoxContainer.style.flexGrow = '2';
      fontBoxContainer.style.alignItems = 'center';
      fontBoxContainer.style.justifyContent = 'space-between';
      fontBoxContainer.style.padding = '5px';
      fontBoxContainer.style.borderWidth = '2px';
      fontBoxContainer.style.borderStyle = 'solid';
      fontBoxContainer.style.overflow = 'hidden';
      fontBoxContainer.style.maxWidth = `${100 / this.fonts.length - 5}%`;
      fontBoxContainer.style.borderColor =
        font === this.currentFont ? Style.settings.toolboxAccentColor : 'transparent';

      fontBoxContainer.addEventListener('click', () => {
        this.setCurrentFont(font, fontBoxContainer);
      })
      panelDiv.appendChild(fontBoxContainer);

      const fontBox = document.createElement('div');
      fontBox.style.display = 'flex';
      fontBox.style.minHeight = '20px';
      fontBox.style.flexGrow = '2';
      fontBox.style.fontFamily = font;
      fontBox.style.overflow = 'hidden';

      const fontLabel = document.createElement('div');
      fontLabel.style.whiteSpace = 'nowrap';
      fontLabel.style.overflow = 'hidden';
      fontLabel.style.textOverflow = 'ellipsis';
      fontLabel.innerHTML = 'The quick brown fox jumps over the lazy dog';

      fontBox.appendChild(fontLabel);

      fontBoxContainer.appendChild(fontBox);

      this.fontBoxes.push(fontBoxContainer);
    });
    return panelDiv;
  }

  private setCurrentFont(newFont: string, target: HTMLDivElement) {
    this.currentFont = newFont;

    this.fontBoxes.forEach(box => {
      box.style.borderColor = box === target ? Style.settings.toolboxAccentColor : 'transparent';
    });

    if (this.onFontChanged) {
      this.onFontChanged(this.currentFont);
    }
  }
}
