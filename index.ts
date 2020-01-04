const group = "ABBO",
nowYear = 2020,
groupMessage = "Happy new Year!!";

const helloWorld = (group: string, nowYear: number, groupMessage: string): string => {
    let message = `Hello ${group}, This year is ${nowYear}. ${groupMessage}`
    return message
};


console.log(helloWorld(group, nowYear, groupMessage))
export {};