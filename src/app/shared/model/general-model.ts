export class NavItem {
  constructor(public display: string, public params: string[], public disabled: boolean = false,
    public qparams: any = null, public handling: string = "") {
  }
}

