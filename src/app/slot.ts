export class Slot {
	memberId: number;
	creationDate: string;
	expiry: string;
	unused: string;
	slotType: string;
	userName: string;
	humanName: string;
	emailAddress: string;
	phoneNumber: string;

	constructor(memberId: number,
		creationDate: string,
		expiry: string,
		unused: string,
		slotType: string,
		userName: string,
		humanName: string,
		emailAddress: string,
		phoneNumber: string
	) {
		this.memberId = memberId;
		this.creationDate = creationDate;
		this.expiry = expiry;
		this.unused = unused;
		this.slotType = slotType;
		this.userName = userName;
		this.humanName = humanName;
		this.emailAddress = emailAddress;
		this.phoneNumber = phoneNumber;
	}

	static createRandomUser(rando: number): Slot {
		// throw new Error("Method not implemented.");
		const id = rando;
		const creationDate = 'creationDate' + rando;
		const expiry = 'expiry' + rando;
		const unused = 'unused' + rando;
		const slotType = 'slotType' + rando;
		const userName = 'userName' + rando;
		const humanName = 'humanName' + rando;
		const emailAddress = 'emailAddress' + rando;
		const phoneNumber = 'phoneNumber' + rando;

		return new Slot(id, creationDate, expiry, unused, slotType, userName, humanName, emailAddress, phoneNumber);
	}

	getColumnValueAt(column: number): string {
		switch (column) {
			case 0:
				return '' + this.memberId;
			case 1:
				return this.creationDate;
			case 2:
				return this.expiry;
			case 3:
				return this.unused;
			case 4:
				return this.slotType;
			case 5:
				return this.userName;
			case 6:
				return this.humanName;
			case 7:
				return this.emailAddress;
			case 8:
				return this.phoneNumber;
			default:
				throw new Error('uh oh!');
		}
	}

}
