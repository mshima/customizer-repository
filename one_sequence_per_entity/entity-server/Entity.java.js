const file = gen => `${gen.SERVER_MAIN_SRC_DIR}${gen.packageFolder}/domain/${gen.asEntity(gen.entityClass)}.java`;

const tmpls = [
    {
        condition: gen => {
            if (gen.prodDatabaseType === 'mysql' || gen.prodDatabaseType === 'mariadb') {
                return false;
            }
            return !gen.relationships.filter(relationship => relationship.useJPADerivedIdentifier).length > 0;
        },
        type: 'replaceContent',
        target: /"sequenceGenerator"/g,
        tmpl: gen => `"${gen.entityInstance}SequenceGenerator"`
    }
];

module.exports = {
    file,
    tmpls
};
