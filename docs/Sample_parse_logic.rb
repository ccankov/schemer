# Sample Logic

db_name = db_data['name']
table_text = db_data[tables].map do |table|
  header_text = "CREATE TABLE #{db_name}\n"
  columns_text = table[columns].map do |column|
    bool_constraints = column[:constraints][:booleans].join(" ")
    language_check = db_data[:script_type] == "mySQL" ? ",\n " : " "
    if column[:variable][:DEFAULT]
      bool_constraints = " DEFAULT #{column[:variable][:DEFAULT]}"
    end
    if column[:variable][:CHECK]
      bool_constraints += " #{language_check}CHECK #{column[:variable][:CHECK]}"
    end
    return "#{column.name} #{column.type} #{bool_constraints}"
  end
  header_text + columns_text.join("\n")
end
return table_text.join("\n")