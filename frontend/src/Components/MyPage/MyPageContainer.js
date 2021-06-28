import React, { Component } from 'react';
import MyPagePresenter from './MyPagePresenter'
import WritingList from './WritingList';
import { Table, Button } from 'react-bootstrap'
import { Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

class MyPageContainer extends Component {

    state = {
        topicList: [],
        writingList: []
    }

    componentDidMount() {
        this.getUserInfo()

    }

    //마이페이지 정보 불러오기
    getUserInfo = () => {
        axios.post('http://localhost:3000/mypage', { userId: this.props.user.userId })
            .then((res) => {
                if (res.data.result === 1) {
                    console.log(res.data.data)
                    console.log('sucess');
                    this.setState({
                        topicList: res.data.data
                    })
                } else {
                    console.log('fail')
                    this.props.history.push('/');
                }
            })

            fetch("http://localhost:3000/writing/getWriting")
            .then(response => {
                return response.json();
            })
            .then(data => {
                if(data.result == false) { console.log("값 없음") }
                else{
                    data = data.filter(writing => {
                        return writing.userId == this.props.user.userId
                    })
                    console.log(data);
                    this.setState({ writingList: data })
                }
            })
    }

    //수정을 위한 상태 변경
    setTopicUpdateReq = () => {
        this.props.setTopicUpdateTrueHandler();
    }

    //주제 삭제
    deleteTopic = (id) => {
        axios.get('http://localhost:3000/deleteTopicItem/' + `${id}`)
            .then((res) => {
                if (res.data.result === 1) {
                    console.log('sucess');
                    this.props.history.push('/');

                } else {
                    console.log('fail')
                    this.props.history.push('/');
                }
            })
    }

    render() {
        const topicLists = this.state.topicList.map(topic =>
            (
                <MyPagePresenter
                    key={topic.topicCode}
                    {...topic}
                    setTopicUpdateReq={this.setTopicUpdateReq}
                    deleteTopic={this.deleteTopic}

                />
            )
        )
        const writingList = this.state.writingList.map(writing =>
            (
                <WritingList
                    key={writing.topicItemCode}
                    {...writing}

                />
            )
        )
        return (
            <div>

                <br /><br />
                <h3 style={{ marginLeft: "740px" }}>주제목록</h3>
                <Table responsive style={{ width: '650px', margin: '10px 470px' }}>
                    <thead>
                        <tr >
                            <th style={{ width: '130px', textAlign: "center" }}>#</th>
                            <th style={{ width: '130px', textAlign: "center" }}>주제</th>
                            <th style={{ width: '130px', textAlign: "center" }}>주제작성자</th>
                            <th style={{ width: '130px', textAlign: "center" }}>수정</th>
                            <th style={{ width: '130px', textAlign: "center" }}>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(topicLists)}
                    </tbody>
                </Table>
                <br /> <br />

                <h3 style={{ marginLeft: "752px" }}>글목록</h3>
                <Table responsive style={{ width: '650px', margin: '10px 470px' }}>
                    <thead>
                        <tr >
                            <th style={{ width: '130px', textAlign: "center" }}>주제제목</th>
                            <th style={{ width: '130px', textAlign: "center" }}>주제목차</th>
                            <th style={{ width: '130px', textAlign: "center" }}>작성자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(writingList)}
                    </tbody>
                </Table>
                <br /> <br />
            </div >
        );
    }
}

export default MyPageContainer;