import {
  ExecCommand,
  SetPopupInfo,
  ToolbarGroupInfo,
  SetItemWidth,
  GetBound,
  HideTooltip,
  ShowTooltip,
  ToolbarCustomOptions,
} from '@t/ui';
import { Emitter } from '@t/event';
import { cls } from '@/utils/dom';
import html from '@/ui/vdom/template';
import { Component } from '@/ui/vdom/component';
import { ToolbarButton } from './toolbarButton';
import { CustomToolbarItem } from './customToolbarItem';

interface Props {
  tooltipEl: HTMLElement;
  disabled: boolean;
  group: ToolbarGroupInfo;
  hidden: boolean;
  hiddenDivider: boolean;
  eventEmitter: Emitter;
  execCommand: ExecCommand;
  setPopupInfo: SetPopupInfo;
  showTooltip: ShowTooltip;
  hideTooltip: HideTooltip;
  getBound: GetBound;
  setItemWidth?: SetItemWidth;
}

export class ToolbarGroup extends Component<Props> {
  render() {
    const { group, hiddenDivider } = this.props;
    const groupStyleClass = group.hidden ? cls('hide') : ''; // group.hidden ? { display: 'none' } : null;
    const dividerStyleClass = hiddenDivider ? cls('hide') : ''; // hiddenDivider ? { display: 'none' } : null;

    return html`
      <div class="${cls('toolbar-group')} ${groupStyleClass}">
        ${group.map((item: ToolbarCustomOptions) => {
          const Comp = item.el ? CustomToolbarItem : ToolbarButton;

          return html`<${Comp} key=${item.name} ...${this.props} item=${item} />`;
        })}
        <div class="${cls('toolbar-divider')} ${dividerStyleClass}"></div>
      </div>
    `;
  }
}
