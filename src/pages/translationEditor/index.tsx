import React from 'react';
import {Helmet} from 'react-helmet-async';
import Editor from './editor';

const TranslationEditor = () => {
  return (
    <>
      <Helmet>
        <title>BUL65-1121 - Omega</title>
      </Helmet>
      <Editor />
    </>
  );
};

export default TranslationEditor;
