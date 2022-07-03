/* eslint-disable eqeqeq */
import { Button, Grid, Paper, TextField, Typography, Stack  } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import './App.css';
import './Global/css/modals.css';
import Instance from './utils/Axios';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const App = () => {
  const [option, setOption] = useState(0);
  const [response, setResponse] = useState(null);
  const [articleId, setArticleId] = useState();
  const [authorId, setAuthorId] = useState();
  const [startDate, setStartDate] = useState('2018-05-09');
  const [endDate, setEndDate] = useState('2018-05-09');
  const [searchTitle, setSearchTitle] = useState('');
  const [createArticle, setCreateArticle] = useState({ title: '', intro: '', content: '', author_id: 0});
  const [updateArticle, setUpdateArticle] = useState({ title: '', intro: '' });
  const [selArticleId, setSelArticleId] = useState();

  const columns = [
    {
      name: 'id',
      label: 'ID',
    },
    {
      name: 'title',
      label: 'title',
    },
    {
      name: 'intro',
      label: 'intro',
    },
    {
      name: 'content',
      label: 'content',
    },
    {
      name: 'author_id',
      label: 'authorId',
    }
  ];
  

  const changeMenu = async (optionSelected) => {
    setResponse(null);
    if (optionSelected === 1) {
      await Instance()
      .get(`/articles`)
      .then(({ data }) => {
        setResponse(data);
        setOption(1);
      })
      .catch((err) => {
        console.log(err);
      });
    } else if (optionSelected === 2) {
      setOption(2);
    } else if (optionSelected === 3) {
      setOption(3);
    } else if (optionSelected === 4) {
      await Instance()
      .get(`/articles/pagination`)
      .then(({ data }) => {
        setResponse(data);
        setOption(4);
      })
      .catch((err) => {
        console.log(err);
      });
    } else if (optionSelected === 5) {
      setOption(5);
    } else if (optionSelected === 6) {
      setOption(6);
    } else if (optionSelected === 7) {
      setOption(7);
    } else if (optionSelected === 8) {
      setOption(8);
    } 
  };

  const searchArticleById = async () => {
    await Instance()
      .get(`/articles/${articleId}`)
      .then(({ data }) => {
        setResponse(data);
      })
      .catch((err) => {
        console.log(err);
        setResponse({});
      });
  };

  const searchArticleByAuthorId = async () => {
    await Instance()
      .get(`/articles/author/${authorId}`)
      .then(({ data }) => {
        setResponse(data);
      })
      .catch((err) => {
        console.log(err);
        setResponse({});
      });
  };

  const searchNextPage = async (nextPage) => {
    if (nextPage) {
      await Instance()
        .get(nextPage)
        .then(({ data }) => {
          setResponse(data);
        })
        .catch((err) => {
          console.log(err);
          setResponse({});
        });
    }
  };

  const searchArticleByDates = async () => {
    await Instance()
      .get(`/articles/dates/${moment(startDate).format('yyyy-MM-DD')}/${moment(endDate).format('yyyy-MM-DD')}`)
      .then(({ data }) => {
        setResponse(data);
      })
      .catch((err) => {
        console.log(err);
        setResponse({});
      });
  };

  const searchArticleByTitle = async () => {
    await Instance()
      .get(`/articles/title/${searchTitle}`)
      .then(({ data }) => {
        setResponse(data);
      })
      .catch((err) => {
        console.log(err);
        setResponse({});
      });
  };

  const saveArticle = async () => {
    await Instance()
      .post(`/articles/`, [{ ...createArticle }])
      .then(({ data }) => {
        setResponse(data && data[0]);
      })
      .catch((err) => {
        console.log(err);
        setResponse({});
      });
  };

  const updateArticleTitleIntro = async () => {
    await Instance()
      .put(`/articles/${selArticleId}`, [{ ...updateArticle }])
      .then(({ data }) => {
        setResponse(data && data[0]);
      })
      .catch((err) => {
        console.log(err);
        setResponse({});
      });
  };
  
  return (
    <>
       <Typography variant="h3" component="div" gutterBottom>Caixa Magica Software - Frontend</Typography>
       <Grid container spacing={2}>
          <Grid item xs={4}>
            <Button variant="text" onClick={() => changeMenu(1)}>List of all articles</Button>
            <br />
            <Button variant="text" onClick={() => changeMenu(2)}>Single article by id</Button>
            <br />
            <Button variant="text" onClick={() => changeMenu(3)}>List of all articles from an author by author id.</Button>
            <br />
            <Button variant="text" onClick={() => changeMenu(4)}>List of all articles with pagination</Button>
            <br />
            <Button variant="text" onClick={() => changeMenu(5)}>List of all articles created between two dates</Button>
            <br />
            <Button variant="text" onClick={() => changeMenu(6)}>List of article search results, searching by title</Button>
            <br />
            <Button variant="text" onClick={() => changeMenu(7)}>Create an article</Button>
            <br />
            <Button variant="text" onClick={() => changeMenu(8)}>Update an article</Button>
          </Grid>
          <Grid item xs={8}>
            {option === 1 ? 
            <>
              <Typography variant="h6" >List of all articles</Typography>
              <MUIDataTable
                  title={'List of articles'}
                  data={response || []}
                  columns={columns}
                />
            </>
            :null}

            {option === 2 ? 
            <>
              <Typography variant="h6" >Single Article by ID</Typography>
              <TextField id="standard-basic" label="Article ID" variant="standard" onChange={(e) => setArticleId(e.target.value)} />
              <Button variant="text" onClick={() => searchArticleById()}>Search</Button>
              <br /><br />
              {response ? 
              <>
                <Typography variant="h6" >Title: {response.title}</Typography>
                <Typography variant="h6" >Intro: {response.intro}</Typography>
                <Typography variant="h6" >Content: {response.content}</Typography>
                <Typography variant="h6" >Author: {response.author_id}</Typography>
              </>
              : null}
            </>
            :null}

            {option === 3 ? 
            <>
              <Typography variant="h6" >List of all articles from an author by author ID</Typography>
              <TextField id="standard-basic" label="Author ID" variant="standard" onChange={(e) => setAuthorId(e.target.value)} />
              <Button variant="text" onClick={() => searchArticleByAuthorId()}>Search</Button>
              <br /><br />
              {response && response.length>0 ? <MUIDataTable
                  title={'List of articles'}
                  data={response || []}
                  columns={columns}
                /> : null}
            </>
            :null}

            {option === 4 ? 
            <>
              <Typography variant="h6" >List of all articles with pagination</Typography>
              <br />
              {response && response.articles.map((article) => {
                return <>
                  <Typography variant="h6" >Title: {article.title} - Intro: {article.intro} - Content: {article.content} - Author: {article.author_id}</Typography>
                </>;
              })}
              { response && response.next ? <Button variant="text" onClick={() => searchNextPage(response.next)}>Next Page</Button> : null }
            </>
            :null}

            {option === 5 ? 
            <>
              <Typography variant="h6" >List of all articles created between two dates</Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <DesktopDatePicker
                      label="Start Date"
                      inputFormat="dd/MM/yyyy"
                      value={startDate}
                      onChange={(e) => setStartDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <DesktopDatePicker
                      label="End Date"
                      inputFormat="dd/MM/yyyy"
                      value={endDate}
                      onChange={setEndDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button variant="text" onClick={() => searchArticleByDates()}>Search</Button>
                  </Grid>
                </Grid>
                </Stack>
               </LocalizationProvider>
              <br /><br />
              {response ? 
              <>
                <MUIDataTable
                  title={'List of articles'}
                  data={response || []}
                  columns={columns}
                />
              </>
              : null}
            </>
            :null}

            {option === 6 ? 
            <>
              <Typography variant="h6" >List of articlezs search ressults, ssearching by title</Typography>
              <TextField id="standard-basic" label="Search Title" variant="standard" onChange={(e) => setSearchTitle(e.target.value)} />
              <Button variant="text" onClick={() => searchArticleByTitle()}>Search</Button>
              <br /><br />
              {response && response.length>0 ? 
              <>
                <MUIDataTable
                  title={'List of articles'}
                  data={response || []}
                  columns={columns}
                />
              </>
              : null}
            </>
            :null}

            {option === 7 ? 
            <>
              <Typography variant="h6" >Create Article</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField id="standard-basic" label="Title" variant="standard" onChange={(e) => setCreateArticle({ ...createArticle, title: e.target.value })} />
                </Grid>
                <Grid item xs={6}>
                  <TextField id="standard-basic" label="Intro" variant="standard" onChange={(e) => setCreateArticle({ ...createArticle, intro: e.target.value })} />
                </Grid>
                <Grid item xs={6}>
                  <TextField id="standard-basic" label="Content" variant="standard" onChange={(e) => setCreateArticle({ ...createArticle, content: e.target.value})} />
                </Grid>
                <Grid item xs={6}>
                  <TextField id="standard-basic" label="Author Id" variant="standard" onChange={(e) => setCreateArticle({ ...createArticle, author_id: e.target.value })} />
                </Grid>
                <Grid item xs={6}>
                  <Button variant="text" onClick={() => saveArticle()}>Create Article</Button>
                </Grid>
              </Grid>
              <br /><br />
              {response ? 
              <>
                <Typography variant="h6" >Title: {response.title}</Typography>
                <Typography variant="h6" >Intro: {response.intro}</Typography>
                <Typography variant="h6" >Content: {response.content}</Typography>
                <Typography variant="h6" >Author: {response.author_id}</Typography>
              </>
              : null}
            </>
            :null}

            {option === 8 ? 
            <>
              <Typography variant="h6" >Update Article</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField id="standard-basic" label="Article Id" variant="standard" onChange={(e) => setSelArticleId(e.target.value)} />
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <TextField id="standard-basic" label="Title" variant="standard" onChange={(e) => setUpdateArticle({ ...updateArticle, title: e.target.value })} />
                </Grid>
                <Grid item xs={6}>
                  <TextField id="standard-basic" label="Intro" variant="standard" onChange={(e) => setUpdateArticle({ ...updateArticle, intro: e.target.value })} />
                </Grid>
                <Grid item xs={6}>
                  <Button variant="text" onClick={() => updateArticleTitleIntro()}>Update Article</Button>
                </Grid>
              </Grid>
              <br /><br />
              {response ? 
              <>
                <Typography variant="h6" >Title: {response.title}</Typography>
                <Typography variant="h6" >Intro: {response.intro}</Typography>
                <Typography variant="h6" >Content: {response.content}</Typography>
                <Typography variant="h6" >Author: {response.author_id}</Typography>
              </>
              : null}
            </>
            :null}
          </Grid>
        </Grid>
    </>
  );
};

export default App;
