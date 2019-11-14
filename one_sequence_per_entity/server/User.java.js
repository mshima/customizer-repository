const file = gen => `${gen.SERVER_MAIN_SRC_DIR}${gen.packageFolder}/domain/User.java`;

const tmpls = [
    {
        type: 'replaceContent',
        target: /"sequenceGenerator"/g,
        tmpl: '"userSequenceGenerator"'
    }
];

module.exports = {
    file,
    tmpls
};
