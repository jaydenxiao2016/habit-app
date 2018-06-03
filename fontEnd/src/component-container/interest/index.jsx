
import React, { Component } from "react";
import { Popover, NavBar, Icon, Button, List } from 'antd-mobile';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { res } from '../../constants/index.js';
import * as actionMethod from '../../action/index.js';

import style from './interest.css';

class interest extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.goBack = this.goBack.bind(this);
    }
    componentDidMount() {
        let {
            async_isLogin
        } = this.props.actionMethod;

        let token = window.localStorage.getItem("token");

        async_isLogin({
            data: {
                token: token
            }
        })
    }
    componentDidUpdate() {
        let {
            isLogin
        } = this.props.userinfo;

        if (!isLogin) {
            this.props.history.replace('/entry')
        }
    }
    goBack(val) {
        this.props.history.goBack()
    }


    render() {
        return (
            <div className={`${style.wrap}`} >
                
                <NavBar 
                    mode="light"
                    leftContent={<Icon type="left" />}
                    onLeftClick={this.goBack}
                >关注的人</NavBar>
                <div className={`${style.message} myCenter` }>
                    <div className={`${style.content}`}>

                        <List className="">
                            <List.Item
                                className=""
                                thumb={<div className={`${style.msg_userPic}`}>
                                    <Link to="/habit/book/0001">
                                        <img src="http://img2.imgtn.bdimg.com/it/u=1416157376,2250476580&fm=27&gp=0.jpg" alt="" />
                                    </Link>
                                </div>}
                                multipleLine
                            >
                                <div className={`${style.msg_right}`}>
                                    <Link to="/habit/book/0001" className={`${style.msg_item}`}>
                                        <div className={`${style.msg_user}`}>
                                            <span>张三</span>
                                            <span></span>
                                        </div>
                                        <List.Item.Brief  style={{fontSize:"12px",margin:"0"}} >个性签名</List.Item.Brief>
                                    </Link>
                                    <div className={`${style.msg_record}`}>
                                        {/* <span className={`${style.btn} `}>已关注</span> */}
                                        <span className={`${style.btn} ${style.active} `}>关注</span>
                                    </div>

                                </div>
                            </List.Item>
                        </List>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let {
        userinfo
    } = state
    return { userinfo };
}
const mapDispatchToProps = (dispath) => {
    return {
        actionMethod: bindActionCreators(actionMethod, dispath)
    }
}
const interest_withRouter = withRouter(interest)
const Interest = connect(
    mapStateToProps,
    mapDispatchToProps
)(interest_withRouter)
export { Interest }