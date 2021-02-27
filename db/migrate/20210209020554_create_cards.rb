class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.string :name
      t.integer :number
      t.string :type
      t.string :suit
      t.string :meaning_up
      t.string :desc
      t.integer :reading_id

      # t.belongs_to :reading, index: true, foreign_key: true

      t.timestamps
    end
  end
end
