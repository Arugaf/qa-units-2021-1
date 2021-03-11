import React from 'react'
import Order from "./Order.js";
import {fakeOrders} from '../data/fakeOrders.js'
import {shallow, configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import {getDate} from "../utils/getDate";

configure({ adapter: new Adapter() });

describe('Order.js', () => {
    it('1 item', () => {
        const orders = shallow(<Order
            key={0}
            order={fakeOrders[0]}
        />);

        expect(orders).toMatchSnapshot();
    });
});

jest.mock('../utils/getDate');
getDate.mockReturnValue("14 марта, чт, 2019 год");

describe('Order.js', () => {
    it('1 item', () => {
        const orders = shallow(<Order
            key={0}
            order={fakeOrders[0]}
        />);

        expect(orders).toMatchSnapshot();
    });


    it('no items', () => {
        const orders = shallow(<Order
            key={0}
            order={null}
        />);

        expect(orders).toMatchSnapshot();
    });

    it('shop is null', () => {
        const orders = shallow(<Order
            key={0}
            order={{shop: null, date: 500}}
        />);

        expect(orders).toMatchSnapshot();
    });

    it('no items', () => {
        const orders = shallow(<Order
            key={0}
            order={{
                id: 123,
                date: 1544356800000,
                shop: 'Alihandro Express',
                items: []
            }}
        />);

        expect(orders).toMatchSnapshot();
    });
});
