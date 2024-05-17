module.exports = {
  async up(queryInterface, Sequelize) {
    const config = {
      tablesToCreate: [{
        tableName: 'entity',
        tableModel: {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
            primaryKey: true,
            allowNull: false,
          },
          entity_external_id: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          entity_type: { // concept, person, place, etc...
            type: Sequelize.TEXT,
            allowNull: false,
          },
          entity_title: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          entity_description: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          entity_value: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
        },
      },
      {
        tableName: 'entity_component_to_memorize',
        tableModel: {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
            primaryKey: true,
            allowNull: false,
          },
          entity_prompt: {
            type: Sequelize.TEXT, // "What is stochastic gradient descent?"
            allowNull: false,
          },
          entity_ideal_answer: {
            type: Sequelize.TEXT, // "Stochastic Gradient Descent refers to..."
            allowNull: false,
          },
        },
      }, {
        tableName: 'entity_review',
        tableModel: {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
            primaryKey: true,
            allowNull: false,
          },
          entity_component_to_memorize_id: {
            type: Sequelize.UUID,
            references: {
              model: 'entity_component_to_memorize',
              key: 'id',
            },
            allowNull: false,
          },
          score: { // between 0 and 1
            type: Sequelize.DECIMAL,
            allowNull: false,
          },
        },
      }],
    };

    return queryInterface.sequelize.transaction(t => queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";', { transaction: t })
      .then(async () => {
        for (const tableToCreate of config.tablesToCreate) {
          const {
            tableName,
            tableModel,
          } = tableToCreate;

          // all tables should automatically have an
          // created_at, and updated_at column
          tableModel.created_at = {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('current_timestamp'),
          };
          tableModel.updated_at = {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('current_timestamp'),
          };
          await queryInterface.createTable(
            tableName,
            tableModel,
            {
              transaction: t,
            },
          );
        }
      })
      // create trigger function to update "updated_at"
      .then(() => {
        const query = `
            CREATE OR REPLACE FUNCTION update_modified_column()   
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = now();
                RETURN NEW;   
            END;
            $$ language 'plpgsql';
          `;
        return queryInterface.sequelize.query(query, { transaction: t });
      })
      // set all tables to use "updated_at" trigger
      .then(async () => {
        for (const tableToCreate of config.tablesToCreate) {
          const { tableName } = tableToCreate;
          const query = `
              CREATE TRIGGER update_table_updated_at BEFORE UPDATE ON ${tableName} FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
            `;
          return queryInterface.sequelize.query(query, { transaction: t });
        }
      }));
  },
  async down(queryInterface, Sequelize) {},
};
