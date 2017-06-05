# Sample JSON

db_data = {
  script_type: "mySQL",
  tables: [
    {
      name: "cats",
      foreign_keys: {
        column_name: table_name,
        column_name: table_name, #etc
      },
      indices: {
        column_name: true,
        column_name: true
      },
      columns: [
        {
          name: "cat_name",
          type: "INT",
          constraints: {
            booleans: [
              "UNIQUE",
              "NOT NULL"
            ],
            variable: {
              DEFAULT: default_value, # default also takes fns
              CHECK: constraint
            }
          }
        }
      ]
    }
  ]
}