import React from 'react'
import Order from "./Order.js";
import {fakeOrders} from '../data/fakeOrders.js'
import {shallow, configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import {getDate} from "../utils/getDate";

configure({adapter: new Adapter()});

jest.mock('../utils/getDate');

describe('Order.js', () => {
    beforeAll(() => {
        getDate.mockReturnValue('14 марта, чт, 2019 год');
    });

    afterAll(() => {
        getDate.mockClear();
    });

    it('render with one item in order', () => {
        const order = shallow(<Order
            order={fakeOrders[0]}
        />);

        expect(order).toMatchSnapshot();
    });


    it('render with null order', () => {
        const order = shallow(<Order
            order={null}
        />);

        expect(order).toEqual({});
    });

    it('render with null shop in order', () => {
        const orderProto = {
            shop: null,
            date: 500
        };

        const order = shallow(<Order
            order={orderProto}
        />);

        expect(order).toEqual({});
    });

    it('render with no items in order', () => {
        const orderProto = {
            id: 1,
            date: 42000000,
            shop: 'test shop',
            items: []
        }

        const order = shallow(<Order
            order={orderProto}
        />);

        expect(order).toMatchSnapshot();
    });
});
