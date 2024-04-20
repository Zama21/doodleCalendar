import cls from './SearchResults.module.css';
import SearchResultsItem from './SearchResultsItems/SearchResultsItem';

export default function SearchResults({ members }) {
    return (
        <div className={cls.wrapperSearchResults}>
            <ul>
                {members.map((member, index) => (
                    <SearchResultsItem key={index} member={member} />
                ))}
            </ul>
        </div>
    );
}
