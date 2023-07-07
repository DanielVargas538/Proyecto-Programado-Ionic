import React, { useState } from 'react';
import '../pages/List.css';
import ListData from './commons/list/listData';

const List: React.FC = () => {

  return(
      <ListData Title='Menu' Edit={false} ID={0} SetEdit={null}/>
  )
};

export default List;