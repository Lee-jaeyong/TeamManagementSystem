import React, { useState, useEffect } from "react";

import GridContainer from "components/Grid/GridContainer";
import CustomCard from "components/CustomCard/CustomCard";

const mockData = [
  {
    team: "C언어 프로젝트",
    date: "2020.04.11",
    list: [
      "음.. 오늘은 메인 화면 제작하기",
      "자바 프로젝트 UI구현",
      "라즈베리파이 과제 진행",
    ],
  },
  {
    team: "자바 프로젝트",
    date: "2020.04.30",
    list: [
      "04월11일 일정계획서 제출",
      "전체 공지 제출하기",
      "라즈베리파이 과제 진행",
      "라즈베리파이 과제 진행 후 라즈베리파이 제작",
    ],
  },
  {
    team: "스프링 프로젝트",
    date: "2020.04.20",
    list: [
      "자바 프로젝트 UI구현",
      "음.. 오늘은 메인 화면 제작하기",
      "라즈베리파이 과제 진행",
    ],
  },
  {
    team: "C언어 프로젝트",
    date: "2020.03.16",
    list: [
      "라즈베리파이 과제 진행",
      "음.. 오늘은 메인 화면 제작하기",
      "자바 프로젝트 UI구현",
    ],
  },
  {
    team: "운영체제 프로젝트",
    date: "2020.04.11",
    list: [
      "자바 프로젝트 UI구현",
      "음.. 오늘은 메인 화면 제작하기",
      "라즈베리파이 과제 진행",
      "라즈베리파이 과제 진행 후 라즈베리파이 제작",
    ],
  },
];

export default function SearchResult(props) {
  return (
    <GridContainer style={{ padding: 30 }}>
      {mockData ? (
        mockData.map((data, idx) => {
          return (
            <CustomCard
              team={data.team}
              date={data.date}
              list={data.list}
              search={props.match.params["search"]}
            />
          );
        })
      ) : (
        <h1>검색된 일정이 없습니다.</h1>
      )}
    </GridContainer>
  );
}
