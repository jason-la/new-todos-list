import React, { useContext } from 'react';
import '../App.css';
import './css/Header.css';

import axios from 'axios';
import classNames from 'classnames';
import { ItemContext } from '../contexts/Items.context';

import tickedIcon from '../img/ticked.svg';

function Header(props) {
    const { state, addNewItem } = useContext(ItemContext);
    let handleSubmit = event => {
        event.preventDefault();
        let text = event.target.querySelector('input').value.trim();
        if (!text || text === '') {
            return;
        }
        event.target.querySelector('input').value = '';
        let newItem = {
            title: text,
            isCompleted: false,
            readOnly: true,
            createdAt: new Date()
        };
        axios
            .post('https://todo-items-api.herokuapp.com/items', newItem)
            .then(res => {
                console.log(res.data);
                addNewItem(res.data);
            })
            .catch(err => console.log(err));
    };

    let { todoItems, checkAll } = state;
    console.log(todoItems);

    let headerCheckAll = classNames({
        'check-mark': true,
        'check-all': checkAll,
        'is-hidden': todoItems.length === 0
    });

    return (
        <div className="Header">
            <div className={headerCheckAll}>
                <img src={tickedIcon} alt="" />
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="What need to be done?" />
            </form>
        </div>
    );
}

export default Header;
