export class IUserDetails {
    constructor(
        public KorisnikID: number,
        public Ime: string,
        public Prezime: string,
        public Email: string,
        public Lozinka: string,
        public DatumRodjenja: Date,
        public Spol: string
    ) { }
}