class Abbo {
    private group : string;
    private nowYear: number;
    public groupMessage: string;
    constructor(groupMessage: string) {
        this.group = "ABBO";
        this.nowYear = new Date().getFullYear();
        this.groupMessage = groupMessage;
    }

    public getNowYear() {
        return this.nowYear;
    }

    public getGroup() {
        return this.group;
    }
}

const niyoung2 = new Abbo("Happy new Year!!");

const helloWorld = (team: Abbo): string => {
    let message = `Hello ${team.getGroup}, This year is ${team.getNowYear}. 
    ${team.groupMessage}`
    return message
};


console.log(helloWorld(niyoung2))
export {};