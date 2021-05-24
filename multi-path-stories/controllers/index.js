const getChildren = (arr, postId) => {
    return arr.filter(el => el.parent == postId)
};

let id1, id2, id3, id4, sent1, sent2, sent3, sent4;

const getMethod = function (req, res, next) {
    let heading = story[req.params.id].sentence;
    const pos = getChildren(story, req.params.id);
    let  place1, place2, place3, place4;
    let submitted1 = false, submitted2 = false, submitted3 = false, submitted4 = false;
    try {
        pos.forEach(p => {
            console.log('forEach', p)
            if (p.position == 1) {
                submitted1 = true;
                sent1 = p.sentence;
                id1 = p.id;
                place1 = p.position;
            }
            if (p.position == 2) {
                submitted2 = true;
                sent2 = p.sentence;
                id2 = p.id;
                place2 = p.position;
            }
            if (p.position == 3) {
                submitted3 = true;
                sent3 = p.sentence;
                id3 = p.id;
                place3 = p.position;
            }
            if (p.position == 4) {
                submitted4 = true;
                sent4 = p.sentence;
                id4 = p.id;
                place4 = p.position;
            }
        })
    } catch (err) {
        console.log('Position is not set yet')
    }

    res.render('index', {
        parentId: req.params.id,
        submitted1,
        submitted2,
        submitted3,
        submitted4,
        sent1,
        sent2,
        sent3,
        sent4,
        id1,
        id2,
        id3,
        id4,
        place1,
        place2,
        place3,
        place4,
        heading
    });
}

const story = [{ id: 0, parent: undefined, position: 0, sentence: "In the beginning there was a cat" }];

const addSentence = (arr, parent, position, sentence) => {
    let idPost = arr.length;
    arr.push({ id: arr.length, parent, position, sentence });
    return idPost;
}

const postMethod = function (req, res, next) {
    let heading = story[req.body.parent].sentence;
    if (req.body.sentence1) {
        id1 = addSentence(story, req.body.parent, 1, req.body.sentence1)
        sent1 = story[id1].sentence;
    }
    if (req.body.sentence2) {
        id2 = addSentence(story, req.body.parent, 2, req.body.sentence2)
        sent2 = story[id2].sentence;
    }
    if (req.body.sentence3) {
        id3 = addSentence(story, req.body.parent, 3, req.body.sentence3)
        sent3 = story[id3].sentence;
    }
    if (req.body.sentence4) {
        id4 = addSentence(story, req.body.parent, 4, req.body.sentence4)
        sent4 = story[id4].sentence;
    }
    res.render('index', {
        tester: 'eggs post',
        parentId: req.body.parent,
        id1,
        id2,
        id3,
        id4,
        sent1,
        sent2,
        sent3,
        sent4,
        submitted1: req.body.submit1,
        submitted2: req.body.submit2,
        submitted3: req.body.submit3,
        submitted4: req.body.submit4,
        heading
    });
    console.log('post', story)
}

module.exports = {
    getMethod,
    postMethod,
    story,

}