import { addDays } from 'date-fns';
import { Tidsperiode } from 'app/types';
import { flyttTidsperiode } from 'app/utils/periodeUtils';
import { getAntallUttaksdagerITidsperiode } from 'app/utils/uttaksdagerUtils';

describe('tidsperiodeUtils', () => {
	const tidsperiodeEnDag: Tidsperiode = {
		startdato: new Date(2018, 0, 1),
		sluttdato: new Date(2018, 0, 1)
	};

	const tidsperiode: Tidsperiode = {
		startdato: new Date(2018, 0, 1),
		sluttdato: new Date(2018, 0, 4)
	};

	const tidsperiodeTorFre: Tidsperiode = {
		startdato: new Date(2018, 0, 4),
		sluttdato: new Date(2018, 0, 5)
	};

	const tidsperiodeFreMan: Tidsperiode = {
		startdato: new Date(2018, 0, 5),
		sluttdato: new Date(2018, 0, 8)
	};

	describe('flyttTidsperiode', () => {
		it('forskyver riktig en dag innenfor en uke', () => {
			const forskyvetPeriode = flyttTidsperiode(tidsperiode, new Date(2018, 0, 2));
			expect(forskyvetPeriode.startdato).toEqual(new Date(2018, 0, 2));
			expect(forskyvetPeriode.sluttdato).toEqual(new Date(2018, 0, 5));
			expect(getAntallUttaksdagerITidsperiode(tidsperiode)).toBe(getAntallUttaksdagerITidsperiode(forskyvetPeriode));
		});
		it('forskyver riktig to dager innenfor en uke', () => {
			const forskyvetPeriode = flyttTidsperiode(tidsperiodeEnDag, new Date(2018, 0, 3));
			expect(forskyvetPeriode.startdato).toEqual(new Date(2018, 0, 3));
			expect(forskyvetPeriode.sluttdato).toEqual(new Date(2018, 0, 3));
			expect(getAntallUttaksdagerITidsperiode(tidsperiodeEnDag)).toBe(
				getAntallUttaksdagerITidsperiode(forskyvetPeriode)
			);
		});
		it('forskyver riktig tre dager innenfor en uke', () => {
			const forskyvetPeriode = flyttTidsperiode(tidsperiodeEnDag, new Date(2018, 0, 4));
			expect(forskyvetPeriode.startdato).toEqual(new Date(2018, 0, 4));
			expect(forskyvetPeriode.sluttdato).toEqual(new Date(2018, 0, 4));
			expect(getAntallUttaksdagerITidsperiode(tidsperiodeEnDag)).toBe(
				getAntallUttaksdagerITidsperiode(forskyvetPeriode)
			);
		});
		it('forskyver riktig fire dager innenfor en uke', () => {
			const forskyvetPeriode = flyttTidsperiode(tidsperiodeEnDag, new Date(2018, 0, 5));
			expect(forskyvetPeriode.startdato).toEqual(new Date(2018, 0, 5));
			expect(forskyvetPeriode.sluttdato).toEqual(new Date(2018, 0, 5));
			expect(getAntallUttaksdagerITidsperiode(tidsperiodeEnDag)).toBe(
				getAntallUttaksdagerITidsperiode(forskyvetPeriode)
			);
		});
		it('forskyver riktig frem dager med overgant til neste uke', () => {
			const forskyvetPeriode = flyttTidsperiode(tidsperiodeEnDag, new Date(2018, 0, 8));
			expect(forskyvetPeriode.startdato).toEqual(new Date(2018, 0, 8));
			expect(forskyvetPeriode.sluttdato).toEqual(new Date(2018, 0, 8));
			expect(getAntallUttaksdagerITidsperiode(tidsperiodeEnDag)).toBe(
				getAntallUttaksdagerITidsperiode(forskyvetPeriode)
			);
		});
		it('forskyver riktig over en helg', () => {
			const forskyvetPeriode = flyttTidsperiode(tidsperiode, new Date(2018, 0, 3));
			expect(forskyvetPeriode.startdato).toEqual(new Date(2018, 0, 3));
			expect(forskyvetPeriode.sluttdato).toEqual(new Date(2018, 0, 8));
			expect(getAntallUttaksdagerITidsperiode(tidsperiode)).toBe(getAntallUttaksdagerITidsperiode(forskyvetPeriode));
		});
		it('sluttdato på fredag blir forskyvet til mandag', () => {
			const forskyvetPeriode = flyttTidsperiode(tidsperiodeTorFre, addDays(tidsperiodeTorFre.startdato, 1));
			expect(forskyvetPeriode.startdato).toEqual(new Date(2018, 0, 5));
			expect(forskyvetPeriode.sluttdato).toEqual(new Date(2018, 0, 8));
			expect(getAntallUttaksdagerITidsperiode(tidsperiodeTorFre)).toBe(
				getAntallUttaksdagerITidsperiode(forskyvetPeriode)
			);
		});
		it('startdato på fredag blir forskyvet til mandag', () => {
			const forskyvetPeriode = flyttTidsperiode(tidsperiodeFreMan, addDays(tidsperiodeTorFre.startdato, 4));
			expect(forskyvetPeriode.startdato).toEqual(new Date(2018, 0, 8));
			expect(forskyvetPeriode.sluttdato).toEqual(new Date(2018, 0, 9));
			expect(getAntallUttaksdagerITidsperiode(tidsperiodeFreMan)).toBe(
				getAntallUttaksdagerITidsperiode(forskyvetPeriode)
			);
		});

		const antallDager = getAntallUttaksdagerITidsperiode(tidsperiode);
		for (let i = 0; i < 10; i++) {
			it(`antall dager er den samme når en forskyver en tidsperiode ${i} dager`, () => {
				const forskyvetPeriode = flyttTidsperiode(tidsperiode, addDays(tidsperiode.startdato, i));
				expect(antallDager).toBe(getAntallUttaksdagerITidsperiode(forskyvetPeriode));
			});
		}
	});
});