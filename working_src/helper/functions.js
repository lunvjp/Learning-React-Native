import uuid from 'uuidv4';

const DATA_API = 'https://connectenglishlearner.000webhostapp.com/wp-json/wp/v2';


// url = 'hhttps://connectenglishlearner.000webhostapp.com/wp-json/wp/v2/question?search=friends'
/**
 * TODO:
 * - Fix TotalQuestion
 */
export const getQuestionByTopicAsync = (slug) => {
  slug = 'friends';
  let url = `${DATA_API}/question?search=${slug}`;
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then((result => {
        console.log(result);
        const questionArray = result.map((question) => ({
          id : question.id,
          title : question.title.rendered,
          totalAnswer : 5
        }));
        resolve(questionArray);
        // return questionArray;
      }))
      .catch(error => {
        console.log(error);
        reject([])
      });
  });
}