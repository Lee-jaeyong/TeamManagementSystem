import React, { useEffect, memo } from 'react';
import Chip from '@material-ui/core/Chip';
import { Fade } from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const TextPanel = memo(() => {
    const text = [
        "계획을 세우지 않는 것은 실패를 계획하는 것이다. - 브라이언트레이시 -",
        "계획을 세워놓는 일만으로 이끌어낼 수 있는 일은 하나도 없다. - 르 위킹 -",
        "계획을 수립하는데는 일을 성취하는데 드는 만큼의 노력을 기울여야 한다. - 지그 지글라 -",
        "계획을 일단 착수한 이상 언제까지나 사정이 생겨도 일정 불변하게 동요하지 않고 서서히 진행시켜야 한다. - 워너 메이커 -",
        "사업에 성공한 사람 중에 아침 일찍 일어나 그 날의 계획을 세우지 않는 사람은 별로 없다. - 윌리엄 A 올코트 -"
    ];
    return (
        <Fade in={true} timeout={1000}>
            <Chip style={{marginRight:30}} label={text[Math.floor(Math.random() * 5)]} color="default" icon={<MenuBookIcon />} />
        </Fade>
    );
});

export default TextPanel;