import React from 'react'
import {sortOrders} from "./sortOrders";
import {sortByItemCount} from './sortOrders';
import {sortByDate} from "./sortOrders";
import {getSortFunction} from "./sortOrders";
import {sortTypes} from "./sortOrders";

describe('sortByItemCount function', () => {
	it('orders are null', () => {
		const result = sortByItemCount(null, null);
		expect(result).toEqual(0);
	});

	it('same items count', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	it('order1 is greater than order2', () => {
		const order1 = {
			items: ['item1', 'item2', 'item3'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});

	it('order1 is less than order2', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2', '3'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});

	it('items are not object', () => {
		const result = sortByItemCount('str', 5);
		expect(result).toEqual(0);
	});

	it.each([
		[{items: null}, {items: null}, 0],
		[{items: 5}, {items: null}, 0],
		[{items: null}, {items: 5}, 0]
	])('items is null', (order1, order2, expected) => {
		expect((sortByItemCount(order1, order2))).toEqual(expected);
	});
});

describe('sortByDate function', () => {
	it('orders are null', () => {
		const result = sortByDate(null, null);
		expect(result).toEqual(0);
	});

	it('same date', () => {
		const date1 = {
			date: 5,
		};

		const date2 = {
			date: 5,
		};

		const result = sortByDate(date1, date2);

		expect(result).toBe(0);
	});

	it('date1 is greater than date2', () => {
		const date1 = {
			date: 5,
		};

		const date2 = {
			date: 2,
		};

		const result = sortByDate(date1, date2);

		expect(result).toBe(-1);
	});

	it('date1 is less than date2', () => {
		const date1 = {
			date: 2,
		};

		const date2 = {
			date: 5,
		};

		const result = sortByDate(date1, date2);

		expect(result).toBe(1);
	});

	it('dates are not object', () => {
		const result = sortByDate('str', 5);
		expect(result).toEqual(0);
	});

	it.each([
		[{date: null}, {date: null}, 0],
		[{date: 5}, {date: null}, 0],
		[{date: null}, {date: 5}, 0]
	])('items is null', (date1, date2, expected) => {
		expect((sortByDate(date1, date2))).toEqual(expected);
	});
});

describe('getSortFunction function', () => {
	it.each([
		[sortTypes.DATE, sortByDate],
		[sortTypes.COUNT, sortByItemCount],
		['test', undefined]
	])('testing callbacks', (type, expected) => {
		expect(getSortFunction(type)).toBe(expected);
	});
});

describe('sortOrders function', () => {
	let mockFunction;

	beforeEach(() => {
		mockFunction = jest.fn(() => 0);
	});

	it('successful call', () => {
		sortOrders([{}, {}], mockFunction);
		expect(mockFunction).toHaveBeenCalled();
	});

	it('orders is null', () => {
		sortOrders(null, mockFunction);
		expect(mockFunction).toHaveBeenCalledTimes(0);
	});

	it('orders length is 0', () => {
		sortOrders([], mockFunction);
		expect(mockFunction).toHaveBeenCalledTimes(0);
	});

	it('no sort function', () => {
		sortOrders([], null);
		expect(mockFunction).toHaveBeenCalledTimes(0);
	});

	it('sort function is not function', () => {
		sortOrders([1], 5);
		expect(mockFunction).toHaveBeenCalledTimes(0);
	});
});
