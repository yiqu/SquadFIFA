export class NavItem {
  constructor(public display: string, public params: string[], public disabled: boolean = false,
    public qparams: any = null, public handling: string = "") {
  }
}

export class StepperObj {
  constructor(public labelName: string, 
    public phDisplay: string, 
    public hint: string,
    public formCtrlName: string,
    public buttonNextDisplay: string = "Next",
    public buttonBackDisplay: string = "Back") {

  }
}