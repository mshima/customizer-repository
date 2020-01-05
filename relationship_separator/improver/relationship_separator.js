/*
 * =======================
 * Init patches
 */
function extend(Superclass, generator) {
    return class GeneratorExtender extends Superclass {
        /**
         * get a table name for joined tables in JHipster preferred style.
         *
         * @param {string} entityName - name of the entity
         * @param {string} relationshipName - name of the related entity
         * @param {string} prodDatabaseType - database type
         */
        getJoinTableName(entityName, relationshipName, prodDatabaseType) {
            const separator = '__';
            const joinTableName = `${this.getTableName(entityName)}${separator}${this.getTableName(relationshipName)}`;
            let limit = 0;
            if (prodDatabaseType === 'oracle' && joinTableName.length > 30 && !this.skipCheckLengthOfIdentifier) {
                this.warning(
                    `The generated join table "${joinTableName}" is too long for Oracle (which has a 30 characters limit). It will be truncated!`
                );

                limit = 30;
            } else if (prodDatabaseType === 'mysql' && joinTableName.length > 64 && !this.skipCheckLengthOfIdentifier) {
                this.warning(
                    `The generated join table "${joinTableName}" is too long for MySQL (which has a 64 characters limit). It will be truncated!`
                );

                limit = 64;
            } else if (prodDatabaseType === 'postgresql' && joinTableName.length >= 63 && !this.skipCheckLengthOfIdentifier) {
                this.warning(
                    `The generated join table "${joinTableName}" is too long for PostgreSQL (which has a 63 characters limit). It will be truncated!`
                );

                limit = 63;
            }
            if (limit > 0) {
                const halfLimit = Math.floor(limit / 2);
                const entityTable = this.getTableName(entityName).substring(0, halfLimit);
                const relationTable = this.getTableName(relationshipName).substring(0, limit - entityTable.length - separator.length);
                return `${entityTable}${separator}${relationTable}`;
            }
            return joinTableName;
        }
    };
}

module.exports = {
    extend
};
