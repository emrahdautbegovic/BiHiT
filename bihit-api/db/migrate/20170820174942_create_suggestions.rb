class CreateSuggestions < ActiveRecord::Migration[5.0]
  def change
    create_table :suggestions do |t|
      t.string :title
      t.datetime :date_created
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
