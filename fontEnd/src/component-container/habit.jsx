
import React, { Component } from "react";
import { List, Modal } from 'antd-mobile';
import { Link, Route, BrowserRouter, Switch, withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { NavBar, Icon } from 'antd-mobile';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import * as actionMethod from '../action/index.js';


class habit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
            modal: false
        }
        this.forward = this.forward.bind(this);
    }
    componentDidMount() {
        let {
            async_getHabit
        } = this.props.actionMethod;
        let userId = window.localStorage.getItem('userId');

        async_getHabit({
            userId
        })
    }
    componentDidUpdate() {

    }
    forward(e) {
        this.props.history.push(e);
    }
    tabEdit() {
        let {
            isEdit
        } = this.state;
        let {
            async_getHabit
        } = this.props.actionMethod;
        let userId = window.localStorage.getItem('userId');

        this.setState({
            isEdit: !isEdit
        })
        async_getHabit({
            userId
        })
    }
    delHabit(item) {
        let {
            async_delHabit
        } = this.props.actionMethod;
        let habitId = item.habit._id;
        let userId = window.localStorage.getItem('userId');

        async_delHabit({
            userId,
            habitId
        })
    }
    editHabit() {
        let {
            habitInfo
        } = this.props.habit;

        if (!habitInfo) return;
        let editHabits = habitInfo.map((item, index) => {

            return (
                <List.Item
                    className="per-habit-item"
                    arrow=""
                    thumb={<div className="iconfont icon-marketing_fill"></div>}
                    multipleLine
                    onClick={
                        () => {
                            Modal.operation([
                                {
                                    text: `删除 ${item.habit.habitName}`,
                                    onPress: () => this.delHabit(item)
                                }
                            ])
                        }
                    }
                    key={index}
                    style={{ border: '1px solid #f40' }}
                >
                    {<div className="per-habit-name">{item.habit.habitName}</div>}

                </List.Item>
            )
        })
        return editHabits
    }
    myHabits() {
        let {
            habitInfo,
            reBook
        } = this.props.habit;

        if (!habitInfo) return;
        return habitInfo.map((item, index) => {
            let isClockIn = reBook ? false : item.isClockIn
            return (
                <List.Item
                    className="per-habit-item"
                    arrow=""
                    thumb={<div className='iconfont icon-marketing_fill'
                        style={isClockIn?{color:'#39cc7b'}:{}}
                    ></div>}
                    multipleLine
                    onClick={() => {
                        this.forward(`/habit/book/${item.habit._id}`)
                    }}
                    key={index}
                >
                    {<div className="per-habit-name">{item.habit.habitName}</div>}
                    <List.Item.Brief className="per-habit-brief">已坚持{item.count}天</List.Item.Brief>
                </List.Item>
            )
        })
        // return showHabits

    }

    render() {
        let {
            isEdit
        } = this.state;
        return (
            <div>
                <NavBar
                    mode="light"
                    rightContent={
                        isEdit ? '' :
                            (<div className="iconfont icon-add"
                                onClick={(e) => { this.forward("/habit/add") }}
                            ></div>)
                    }
                    leftContent={
                        isEdit ?
                            (<div onClick={(e) => { this.tabEdit() }}>返回</div>) :
                            (<div onClick={(e) => { this.tabEdit() }}>编辑</div>)
                    }
                >
                    {isEdit ? '退出习惯' : '我的习惯'}
                </NavBar>
                <List className="per-habit-list">
                    {isEdit ? this.editHabit() : this.myHabits()}
                </List>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let {
        habit
    } = state;
    return { habit };
}
const mapDispatchToProps = (dispath) => {
    return {
        actionMethod: bindActionCreators(actionMethod, dispath)
    }
}
const habit_withRouter = withRouter(habit)
const Habit = connect(
    mapStateToProps,
    mapDispatchToProps
)(habit_withRouter)
export default Habit;