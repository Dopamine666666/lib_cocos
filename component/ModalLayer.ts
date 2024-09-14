import { _decorator, Component, Label, Node, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ModalLayer')
export class ModalLayer extends Component {
    @property({type: Node, displayName: '阴影'})
    private shadow: Node = null;

    @property({type: Label, displayName: '标题'})
    private titleLabel: Label = null;

    @property({type: RichText, displayName: '文本'})
    private contentText: RichText = null;

    @property({type: Node, displayName: '关闭按钮'})
    private closeBtn: Node = null;

    @property({type: Node, displayName: '取消按钮'})
    private cancelBtn: Node = null;

    @property({type: Node, displayName: '确定按钮'})
    private confirmBtn: Node = null;

    @property({type: Label, displayName: '取消按钮'})
    private cancelLabel: Label = null;

    @property({type: Label, displayName: '确定标签'})
    private confirmLabel: Label = null;

    private callback: (idx: number) => void;
    /**
     * @returns 0取消，1确认
     * @example const ret = await ModalLayer.Show({text: balabala});
     */
    async Show(state: {title?: string, text: string, confirmLabel?: string, cancelLabel?: string, buttons?: {close?: boolean, confirm?: boolean, cancel?: boolean}}) {
        this.node.active = this.shadow.active = true;
        state.title = state.title || '提示';
        state.confirmLabel = state.confirmLabel || '确定';
        state.cancelLabel = state.cancelLabel || '取消';
        state.buttons = state.buttons || {confirm: true};
        this.titleLabel.string = state.title;
        this.confirmLabel.string = state.confirmLabel;
        this.cancelLabel.string = state.cancelLabel;
        this.contentText.string = state.text;
        this.closeBtn.active = state.buttons.close;
        this.confirmBtn.active = state.buttons.confirm;
        this.cancelBtn.active = state.buttons.cancel;
        return new Promise<number>(resolve => this.callback = resolve);
    }

    ButtonClicked(evt: Event, idx: string | number) {
        this.node.active = this.shadow.active = false;
        this.callback(+idx);
    }
}