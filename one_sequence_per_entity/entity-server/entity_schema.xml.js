const file = gen => `${gen.constants.SERVER_MAIN_RES_DIR}config/liquibase/changelog/${gen.changelogDate}_added_entity_${gen.entityClass}.xml`;

const tmpls = [
    {
        condition: gen => {
            if (gen.prodDatabaseType === 'mysql' || gen.prodDatabaseType === 'mariadb') {
                return false;
            }
            return !gen.relationships.filter(relationship => relationship.useJPADerivedIdentifier).length > 0;
        },
        type: 'rewriteFile',
        target: '<!-- jhipster-needle-liquibase-add-changeset - JHipster will add changesets here, do not remove-->',
        tmpl: gen => `<changeSet id="${gen.changelogDate}-1-sequence" author="jhipster">
        <createSequence sequenceName="${gen._.snakeCase(gen.entityClass)}_sequence_generator" startValue="1050" incrementBy="\${incrementBy}"/>
    </changeSet>
`
    }
];

module.exports = {
    file,
    tmpls
};
